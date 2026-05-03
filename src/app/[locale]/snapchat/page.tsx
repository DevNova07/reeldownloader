import { getSeoAlternates } from "@/lib/seo";
import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import SnapchatPageTemplate from "@/components/templates/SnapchatPage"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const dict = await getDictionary(locale);
  const snap = dict.platforms.snapchat;
  return {
    title: snap.seo.title,
    alternates: getSeoAlternates("snapchat", locale),
  };
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const fullDict = await getDictionary(locale);
  
  // Filter dictionary to reduce client-side payload
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      snapchat: platforms?.snapchat
    }
  };

  return <SnapchatPageTemplate locale={locale} dict={dict} content={platforms?.snapchat} />
}
